const commands = {
    g: {
        name: 'Google Main Page',
        url: 'https://www.google.com/',
        searchUrl: 'https://www.google.com/search?q=%s'
    },
    aya: {
        name: "Aya Pulse Page",
        url: "https://thepulse.ayahealthcare.com/#"
    },
    ticket: {
        name: "Aya Ticketing System",
        description: "Usage: ticket <ticket_number>",
        url: "https://ayadev.atlassian.net/browse/{0}"
    },
    cf: {
        name: "Conflience",
        description: "Usage: cf <search_terms>",
        url: "https://ayadev.atlassian.net/wiki/search?text=%s"
    },
    tcv: {
        prefix: "TCV-",
        name: "Aya Ticketing System - TCV set",
        url: "https://ayadev.atlassian.net/browse/TCV-{0}"
    }
};
