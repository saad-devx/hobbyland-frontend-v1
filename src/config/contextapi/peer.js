import React, { useEffect, useMemo, useState } from "react";
import { AuthToken } from "../Axiosconfig/AxiosHandle/chat";
import { off } from "npm";
const PeerContext = React.createContext(null)
export const usePeer = () => React.useContext(PeerContext)
export const PeerProvider = (props) => {
    const [token, setToken] = useState()
    const FetchToken = async () => {
        try {
            const response = await AuthToken()
            if (response) {
                setToken(response.data.token)
            }
        } catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        FetchToken()
    }, [])
    const Peer = useMemo(() => new RTCPeerConnection(
        {
            query: {
                token: token,
            },


        }
    ), [])
    const CreateOffer = async () => {
        const offer = await Peer.createOffer()
        await Peer.setLocalDescription(offer)
        return offer
    }
    return (<PeerContext.Provider value={{ Peer, CreateOffer }}>{props.children}</PeerContext.Provider>)

}