export async function main(ns) {
    const servers = getServers(ns);
    var output = "";
    //terminal-input
    servers.forEach(server => {
        if (!(ns.args[0] != undefined && server.depth > ns.args[0]) && server.depth != 0) {
            const host = server.name;

            var contractBase = "----";
            var contracts = "";
            var contractPostfix = "";

            ns.ls(host, ".cct").forEach(cct => {
                if (cct.includes('-', 10)) {
                    contractBase = "WARN";
                } else {
                    contractBase = "INFO";
                }

                if(contracts != "") contractPostfix = "S";
                contracts += cct;
            });

            const baseDashes = "<br>" + contractBase + "--".repeat((server.depth - 1) * 2);
            let path = server.path.toString()

            const regex = new RegExp(',', "g");
            path = path.replace(regex, "")

            output += baseDashes + `> <a style="cursor:pointer; text-decoration: underline;" onclick='
            const terminalInput = document.getElementById("terminal-input");
            terminalInput.value = "home;${path}";
            
            const handler = Object.keys(terminalInput)[1];
            terminalInput[handler].onChange({target:terminalInput});
            terminalInput[handler].onKeyDown({keyCode:13,preventDefault:()=>null});
            '>${host}</a>`;
            output += baseDashes + "--Root Access: " + (ns.hasRootAccess(host) ?
                "YES" : "NO") + ", Required hacking skill: " + ns.getServerRequiredHackingLevel(host);
            output += baseDashes + "--Number of open ports required to NUKE: "
                + ns.getServerNumPortsRequired(host);
            output += baseDashes + "--RAM: " + ns.getServerMaxRam(host) + ".00GB";

            if(ns.args.includes("--detail-contract") && contracts != ""){
                output += baseDashes + "--CONTRACT" + contractPostfix + ": " + contracts;
            }

            output += "<br>";
        }
    });

    document.getElementById("terminal").innerHTML += `<li class="jss468 MuiListItem-root MuiListItem-gutters
     MuiListItem-padding css-1578zj2"><p class="jss473 MuiTypography-root 
     MuiTypography-body1 css-18ubon4">${output}</p></li>`;
}

let svObj = (name = 'home', depth = 0, path = "") => ({ name: name, depth: depth, path: path });
export function getServers(ns) {
    let result = [];
    let visited = { 'home': 0 };
    let queue = Object.keys(visited);
    let name;
    while ((name = queue.pop())) {
        let depth = visited[name];

        var pathToTarget = [];
        let paths = { "home": "" };
        let queue1 = Object.keys(paths);
        let name1;
        while ((name1 = queue1.shift())) {
            let path = paths[name1];
            let scanRes = ns.scan(name1);
            for (let newSv of scanRes) {
                if (paths[newSv] === undefined) {
                    queue1.push(newSv);
                    paths[newSv] = `${path},${newSv}`;
                    if (newSv == name){
                        pathToTarget = paths[newSv].substr(1).split(",");
                    }
                }
            }
        }

        const path = pathToTarget.map(server => "connect " + server + ";")
        result.push(svObj(name, depth, path));
        let scanRes = ns.scan(name);
        for (let i = scanRes.length; i >= 0; i--) {
            if (visited[scanRes[i]] === undefined) {
                queue.push(scanRes[i]);
                visited[scanRes[i]] = depth + 1;
            }
        }
    }
    return result;
}
