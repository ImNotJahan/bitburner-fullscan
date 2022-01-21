/** @param {NS} ns **/
export async function main(ns) {
	var usedRam = 0;
	var maxRam = ns.getServerMaxRam("home");
	while(maxRam > usedRam){
		ns.run("weaken.js", 1, ns.args[0], Math.random() * 500);
		usedRam += ns.getScriptRam("weaken.js", "home");
	}
}
