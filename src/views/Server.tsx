import { faHashtag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useSelector } from "react-redux";
import { Route, Switch, useParams } from "react-router";

import { ChannelBar } from "../components/ChannelBar";
import { ServerBar } from "../components/ServerBar";
import { routes } from "../constants/routes";
import { makeServerChannelsSelector } from "../reducers/channels";
import { selectServers } from "../reducers/servers";
import { UserMenu } from "../components/UserMenu";
import { AddUser } from "../components/ServerAddUser";
import { AddChannel } from "../components/ServerAddChannel";
import { ServerPane } from "../components/ServerPane";
import { ServerSettings } from "../components/ServerSettings";

export interface IServerParams {
    serverID: string;
    channelID: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Server(): JSX.Element {
    const { serverID, channelID } = useParams<{
        serverID: string;
        channelID: string;
    }>();

    const servers = useSelector(selectServers);
    const serverChannels = useSelector(makeServerChannelsSelector(serverID));

    const server = servers[serverID];

    // loading
    if (!server) {
        return <div />;
    }

    return (
        <div>
            <ServerBar />
            <ChannelBar name={server.name} serverID={serverID} />
            <UserMenu />
            <div className="pane">
                <div className="pane-topbar">
                    {serverChannels[channelID] && (
                        <h2 className="subtitle">
                            <FontAwesomeIcon icon={faHashtag} />
                            &nbsp;&nbsp;
                            {serverChannels[channelID].name}
                        </h2>
                    )}
                </div>
                <Switch>
                    <Route
                        exact
                        path={routes.SERVERS + "/:serverID/add-user"}
                        render={() => <AddUser />}
                    />
                    <Route
                        exact
                        path={routes.SERVERS + "/:serverID/add-channel"}
                        render={() => <AddChannel />}
                    />
                    <Route
                        exact
                        path={routes.SERVERS + "/:serverID/settings"}
                        render={() => <ServerSettings />}
                    />
                    <Route
                        exact
                        path={
                            routes.SERVERS + "/:serverID/channels/:channelID?"
                        }
                        render={() => <ServerPane />}
                    />
                </Switch>
            </div>
        </div>
    );
}