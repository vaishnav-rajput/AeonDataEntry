const BASE_URL = process.env.REACT_APP_BASE_URL

export const entryEndpoints = {
    CREATEENTRY_API: BASE_URL + "/entry/createEntry",
    GETALLENTRIES_API: BASE_URL + "/entry/showAllEntries",
    DELETEENTRY_API: BASE_URL + "/entry/deleteEntry"
}

export const clientEndpoints = {
    GETALLCLIENTS_API: BASE_URL + "/client/showAllClients",
    CREATECLIENT_API: BASE_URL + "/client/createClient",
    CLIENTENTRIES_API: BASE_URL + "/client/clientEntries"
}

export const logsEndpoints = {
    GET_DELETED_LOGS: BASE_URL + "/logs/getDeletedLogs"
}