export async function main(ns) {
    const servers = getServers(ns);

    servers.forEach(server => {
        if(!(ns.args[0] != undefined && server.depth > ns.args[0]) && server.depth != 0){
            const host = server.name;

            var hasContract = false;
            ns.ls(host, ".cct").forEach(cct => hasContract = true);

            const baseDashes = hasContract ? "INFO" + "--".repeat((server.depth - 1) * 2) 
            : "----".repeat(server.depth - 1);

            ns.tprintf(baseDashes + "> " + host);
            ns.tprintf(baseDashes + "--Root Access: " + (ns.hasRootAccess(host) ?
            "YES" : "NO") + ", Required hacking skill: " + ns.getServerRequiredHackingLevel(host));
            ns.tprintf(baseDashes + "--Number of open ports required to NUKE: " 
            + ns.getServerNumPortsRequired(host));
            ns.tprintf(baseDashes + "--RAM: " + ns.getServerMaxRam(host) + ".00GB");
            ns.tprintf(" ");    
        }
    });
}

let svObj = (name = 'home', depth = 0) => ({ name: name, depth: depth });
export function getServers(ns) {
    let result = [];
    let visited = { 'home': 0 };
    let queue = Object.keys(visited);
    let name;
    while ((name = queue.pop())) {
        let depth = visited[name];
        result.push(svObj(name, depth));
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
