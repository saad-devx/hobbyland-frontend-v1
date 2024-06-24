import io from 'socket.io-client';

const createSocket = (url, token) => {
    const socket = io(url, {
        query: { token }
    });

    socket.asyncEmit = (type, data = {}) => {
        return new Promise((resolve, reject) => {
            socket.emit(type, data, response => {
                if (response && response.error) reject(response.error);
                else resolve(response);
            });
        });
    };

    return socket;
};

export default createSocket;
