import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";

import { routes } from "../constants/routes";
import { lockFX } from "../constants/sounds";
import { useQuery } from "../hooks/useQuery";
import { resetApp } from "../reducers/app";
import { resetChannels } from "../reducers/channels";
import { reset as resetDevices } from "../reducers/devices";
import { resetFamiliars } from "../reducers/familiars";
import { reset as resetFiles } from "../reducers/files";
import { reset as resetGroupMessages } from "../reducers/groupMessages";
import { reset as resetHistoryStacks } from "../reducers/historyStacks";
import { resetMessages } from "../reducers/messages";
import { reset as resetOnlineLists } from "../reducers/onlineLists";
import { resetPermissions } from "../reducers/permissions";
import { resetServers } from "../reducers/servers";
import { resetSessions } from "../reducers/sessions";
import { resetUser } from "../reducers/user";
import store from "../utils/DataStore";
import gaurdian from "../utils/KeyGaurdian";

export function Logout(): JSX.Element {
    const dispatch = useDispatch();
    const history = useHistory();
    const query = useQuery();

    const logout = async () => {
        const client = window.vex;
        await client.close();

        if (query.get("clear") !== "off") {
            gaurdian.clear();
        } else {
            console.warn(
                "clear set to off explicitly, keeping keys in gaurdian."
            );
        }

        dispatch(resetApp());
        dispatch(resetChannels());
        dispatch(resetDevices());
        dispatch(resetFamiliars());
        dispatch(resetFiles());
        dispatch(resetGroupMessages());
        dispatch(resetHistoryStacks());
        dispatch(resetMessages());
        dispatch(resetOnlineLists());
        dispatch(resetPermissions());
        dispatch(resetServers());
        dispatch(resetSessions());
        dispatch(resetUser());

        if (store.get("settings.sounds") as boolean) {
            await lockFX.play();
        }

        history.push(query.get("forward") || routes.HOME);
    };

    void useMemo(() => logout(), []);

    return <div />;
}
