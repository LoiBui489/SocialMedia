'use client';

import { useEffect, useState } from "react";
import { socket } from '../socket';

export default function Socket({ username }: { username: string }) {
    const [isConnected, setIsConnected] = useState(false);
    const [transport, setTransport] = useState("N/A");

    useEffect(() => {
        if (socket.connected) {
            onConnect();
        }

        function onConnect() {
            setIsConnected(true);
            setTransport(socket.io.engine.transport.name);

            socket.io.engine.on("upgrade", (tr) => {
                setTransport(tr.name)
            });
            socket.emit("newUser", username);
            console.log(`${isConnected}: ${transport}`)
        }

        function onDisconnect() {
            setIsConnected(false);
            setTransport("N/A");
        }

        socket.on("connect", onConnect);
        socket.on("disconnect", onDisconnect);
        return () => {
            socket.off("connect", onConnect);
            socket.off("disconnect", onDisconnect);
        }
    }, [username, isConnected, transport]);

    return (
        <span></span>
    );
};
