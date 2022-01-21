const doc = eval("document");

export async function main(ns) {
	const HUDElement = doc.getElementById("root").firstChild.firstChild.firstChild.firstChild
	.firstChild.firstChild.firstChild;
	
	const statName = "Mys";
	var statValue = 0;
	var text = htmlToElement(`
	<tr class="MuiTableRow-root css-1dix92e" id="custom-stat">
	<th class="jss7 MuiTableCell-root MuiTableCell-body MuiTableCell-sizeMedium css-hadb7u" scope="row">
	<p class="jss12 MuiTypography-root MuiTypography-body1 css-cxl1tz">${statName}&nbsp;</p></th>
	<td class="jss7 MuiTableCell-root MuiTableCell-body MuiTableCell-alignRight MuiTableCell-sizeMedium css-7v1cxh">
	<p class="jss12 MuiTypography-root MuiTypography-body1 css-cxl1tz">${statValue}</p></td>
	<td class="jss7 MuiTableCell-root MuiTableCell-body MuiTableCell-alignRight MuiTableCell-sizeMedium css-7v1cxh">
	<p class="jss12 MuiTypography-root MuiTypography-body1 css-cxl1tz" id="overview-cha-hook"></p></td></tr>`);
	
	var percent = 0;
	var bar = htmlToElement(`
	<tr class="MuiTableRow-root css-1dix92e">
	<th class="jss7 MuiTableCell-root MuiTableCell-body MuiTableCell-sizeMedium css-hadb7u" scope="row" colspan="2" style="padding-bottom: 2px; position: relative; top: -3px;">
	<span class="MuiLinearProgress-root MuiLinearProgress-colorPrimary MuiLinearProgress-determinate css-koo86v" role="progressbar" aria-valuenow="49" aria-valuemin="0" aria-valuemax="100">
	<span class="MuiLinearProgress-bar MuiLinearProgress-barColorPrimary MuiLinearProgress-bar1Determinate css-14usnx9" style="transform: translateX(-${100-percent}%);"></span></span></th></tr>`);

	HUDElement.children[14].after(text);
	text.after(bar);
	
	ns.atExit(() => { text.remove(); bar.remove(); }); // Removes stat on script kill

	while(true){
		percent++;

		if(percent > 100) percent = 0; statValue++;

		// Updating elements
		// Very inneficient

		text.remove(); bar.remove();
		
		text = htmlToElement(`
			<tr class="MuiTableRow-root css-1dix92e" id="custom-stat">
			<th class="jss7 MuiTableCell-root MuiTableCell-body MuiTableCell-sizeMedium css-hadb7u" scope="row">
			<p class="jss12 MuiTypography-root MuiTypography-body1 css-cxl1tz">${statName}&nbsp;</p></th>
			<td class="jss7 MuiTableCell-root MuiTableCell-body MuiTableCell-alignRight MuiTableCell-sizeMedium css-7v1cxh">
			<p class="jss12 MuiTypography-root MuiTypography-body1 css-cxl1tz">${statValue}</p></td>
			<td class="jss7 MuiTableCell-root MuiTableCell-body MuiTableCell-alignRight MuiTableCell-sizeMedium css-7v1cxh">
			<p class="jss12 MuiTypography-root MuiTypography-body1 css-cxl1tz" id="overview-cha-hook"></p></td></tr>`
		);
			
		bar = htmlToElement(`
			<tr class="MuiTableRow-root css-1dix92e">
			<th class="jss7 MuiTableCell-root MuiTableCell-body MuiTableCell-sizeMedium css-hadb7u" scope="row" colspan="2" style="padding-bottom: 2px; position: relative; top: -3px;">
			<span class="MuiLinearProgress-root MuiLinearProgress-colorPrimary MuiLinearProgress-determinate css-koo86v" role="progressbar" aria-valuenow="49" aria-valuemin="0" aria-valuemax="100">
			<span class="MuiLinearProgress-bar MuiLinearProgress-barColorPrimary MuiLinearProgress-bar1Determinate css-14usnx9" style="transform: translateX(-${100-percent}%);"></span></span></th></tr>`
		);

		HUDElement.children[14].after(text);
		text.after(bar);

		await ns.sleep(1000);
	}
}

// https://stackoverflow.com/a/35385518/11131159
function htmlToElement(html) {
    var template = doc.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
}
