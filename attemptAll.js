/** @param {NS} ns **/
export async function main(ns) {
	const servers = await getServers(ns);
	
	for(let k = 0; k < servers.length; k++){
		const server = servers[k].name;
        const threads = Math.floor((ns.getServerMaxRam(server) - 
		ns.getServerUsedRam(server)) / ns.getScriptRam("hack.js", "home"));
        let portOpeners = 0;

        if (ns.fileExists("BruteSSH.exe", "home")) {
            await ns.brutessh(server);
            portOpeners++;
        } 
        if (ns.fileExists("FTPCrack.exe", "home")) {
            await ns.ftpcrack(server);
            portOpeners++;
        }
        if (ns.fileExists("relaySMTP.exe", "home")) {
            await ns.relaysmtp(server);
            portOpeners++;
        } 
        if (ns.fileExists("HTTPWorm.exe", "home")) {
            await ns.httpworm(server);
            portOpeners++;
        } 
        if (ns.fileExists("SQLInject.exe", "home")) {
            await ns.sqlinject(server);
            portOpeners++;
        }

        if(portOpeners >= ns.getServerNumPortsRequired(server)){
            await ns.nuke(server);

	    	await ns.scp("hack.js", server);

		    if(threads > 0) ns.exec("hack.js", server, threads, ns.args[0]);
        }
    }
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
