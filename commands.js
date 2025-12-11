const commands = {
    g: {
        default: true,
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
        prefix: "tcv-",
        name: "Aya Ticketing System - TCV set",
        url: "https://ayadev.atlassian.net/browse/TCV-{0}"
    },
    nova: {
        name: "Nova",
        url: "https://nova-{0}.ayahealthcare.com/",
        description: "Usage: nova <environment>"
    },
    'nova-int': {
        prefix: "nv int",
        name: "Nova",
        url: "https://nova-int.ayahealthcare.com/",
        description: "Usage: nova <environment>"
    },
    'test-command': {
        name: "Test Command",
        rules: [
            { 
                condition: "{0} > 10",
                url: "https://example.com/greater-than-10"
            },
            {
                condition: "{0} <= 10",
                url: "https://example.com/less-equal-10"
            },
            {
                condition: "'{0}' == 'unknown'",
                url: "https://example.com/unknown"
            }
        ],
        url: "https://example.com/default1",
    }

};
