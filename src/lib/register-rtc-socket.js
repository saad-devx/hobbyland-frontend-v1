import createSocket from "./promisified-io";

const registerRtcSocket = async () => {
    try {
        const rtcSocketInstance = createSocket(WEBRTCBASEURL, localStorage.getItem("Sockettoken"));
        rtcSocketInstance.on("connect", () => {
            console.log("RTC Socket connected successfully");

            io.on('newProducer', (data) => {
                console.log('newProducer', data);
                if (data.socketID !== io.id) store.dispatch({ type: Actions.RTC_PRODUCER, data });
            });

            io.on('leave', (data) => {
                console.log('leave', data);
                let { producers } = store.getState().rtc;
                producers = producers.filter((producer) => producer.socketID !== data.socketID);
                console.log('producers after leave', producers);
                store.dispatch({ type: Actions.RTC_RESET_PRODUCERS, producers, socketID: data.socketID });
            });

            io.on('consumers', (data) => {
                console.log('consumers', data);
                store.dispatch({ type: Actions.RTC_CONSUMERS, consumers: data });
            });

            io.on('newPeer', (data) => {
                console.log('newPeer', data);
                store.dispatch({ type: Actions.RTC_NEW_PEER, data });
            });

            io.on('call', (data) => {
                console.log('call', data);
                store.dispatch({ type: Actions.RTC_SET_COUNTERPART, counterpart: data.counterpart });
                store.dispatch({ type: Actions.RTC_CALL, data });
            });

            io.on('close', (data) => {
                console.log('close', data);
                store.dispatch({ type: Actions.RTC_CLOSE, data });
            });

            io.on('answer', (data) => {
                console.log('answer', data);
                store.dispatch({ type: Actions.RTC_ANSWER, data });
            });

            io.on('remove', (data) => {
                console.log('remove', data.producerID);
                let { producers } = store.getState().rtc;
                producers = producers.filter((producer) => producer.producerID !== data.producerID);
                console.log('producers after remove', producers);
                store.dispatch({
                    type: Actions.RTC_RESET_PRODUCERS,
                    producers,
                    socketID: data.socketID,
                    lastLeaveType: 'remove',
                    producerID: data.producerID,
                });
            });

            io.on('onlineUsers', (data) => {
                store.dispatch({ type: Actions.ONLINE_USERS, data });
            });

            io.on('refresh-meetings', (data) => {
                store.dispatch({ type: Actions.REFRESH_MEETINGS, timestamp: data.timestamp });
            });

            io.on('user-deleted', async () => {
                localStorage.removeItem('token');
                await setGlobal({
                    token: null,
                    user: {},
                });
            });

            window.onbeforeunload = () => io.emit('leave', { room_id });
        });

        return rtcSocketInstance;
    } catch (e) { console.log("Error connecting to the RTC socket server: ", e) }
}