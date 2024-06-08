const BASE_URL = process.env.REACT_APP_BASE_URL

export const entryEndpoints = {
    CREATEENTRY_API: BASE_URL + "/entry/createEntry",
    GETALLENTRIES_API: BASE_URL + "/entry/showAllEntries",
    DELETEENTRY_API: BASE_URL + "/entry/deleteEntry",
    EDITENTRY_API: BASE_URL + "/entry/editEntry",
    SETTIME_API: BASE_URL + "/entry/addTime"
}

export const clientEndpoints = {
    GETALLCLIENTS_API: BASE_URL + "/client/showAllClients",
    CREATECLIENT_API: BASE_URL + "/client/createClient",
    CLIENTENTRIES_API: BASE_URL + "/client/clientEntries"
}

export const logsEndpoints = {
    GET_DELETED_LOGS: BASE_URL + "/logs/getDeletedLogs",
    GET_EDITED_LOGS: BASE_URL + "/logs/getEditedEntries"
}

export const engineerEndpoints = {
    GETALLENGINEERS_API: BASE_URL + "/engineer/showAllEngineers",
    CREATEENGINEER_API: BASE_URL + "/engineer/createEngineer",
    ENGINEERENTRIES_API: BASE_URL + "/engineer/engineerEntries"
}
