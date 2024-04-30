const BASE_URL = process.env.REACT_APP_BASE_URL

export const entryEndpoints = {
    CREATEENTRY_API: BASE_URL + "/entry/createEntry",
    GETALLENTRIES_API: BASE_URL + "/entry/showAllEntries"
}

