const numberOfCustomActions = 12;

const options = new Array();
options.push({
    identifier: "enableDefaultAction",
    type: "boolean",
    label: "Enable Default Action"
});
options.push({
    identifier: "heading",
    type: "heading",
    label: "Custom Actions",
});
for (let i = 1; i <= numberOfCustomActions; i++) {
    options.push({
        identifier: `customAction${i}`,
        type: "string",
        label: `Name`,
        inset: true
    });
    options.push({
        identifier: `customAction${i}Icon`,
        type: "string",
        label: `Icon`,
        inset: true
    });
}

function search(action, input) {
    const url = `snapsrch://search?action=${encodeURIComponent(action)}&query=${encodeURIComponent(input.text)}`;
    popclip.openUrl(url);
}

define({
    options: options,
    actions: (input, options) => {
        const actions = new Array();
        if (options.enableDefaultAction) {
            actions.push({
                code: (input) => search("", input)
            });
        }
        for (let i = 1; i <= numberOfCustomActions; i++) {
            const name = options[`customAction${i}`];
            if (name != "") {
                const icon = options[`customAction${i}Icon`];
                actions.push({
                    title: name,
                    icon: icon != "" ? icon : null,
                    code: (input) => search(name, input)
                });
            }
        }
        return actions;
    }
});