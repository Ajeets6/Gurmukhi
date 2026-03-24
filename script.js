(() => {
	"use strict";

	function getCellData(td) {
		const nativeEl = td.querySelector(".native");
		const latinEl = td.querySelector(".latin");
		const nameEl = td.querySelector(".name");

		return {
			native: nativeEl ? nativeEl.textContent.trim() : "",
			latin: latinEl ? latinEl.textContent.trim() : "",
			name: nameEl ? nameEl.textContent.trim() : "",
		};
	}

	function createEmptyTd() {
		const td = document.createElement("td");
		td.className = "cell empty";
		return td;
	}

	function createLetterTd(data) {
		const td = document.createElement("td");
		td.className = "cell";

		const nativeDiv = document.createElement("div");
		nativeDiv.className = "native";
		nativeDiv.textContent = data.native;

		const latinDiv = document.createElement("div");
		latinDiv.className = "latin";
		latinDiv.textContent = data.latin;

		const nameDiv = document.createElement("div");
		nameDiv.className = "name";
		nameDiv.textContent = data.name;

		td.append(nativeDiv, latinDiv, nameDiv);
		return td;
	}

	function renderGridToTbody(cellDataList, columns) {
		const tbody = document.createElement("tbody");
		const total = cellDataList.length;
		for (let index = 0; index < total; index += columns) {
			const tr = document.createElement("tr");
			for (let offset = 0; offset < columns; offset++) {
				const cell = cellDataList[index + offset] ?? null;
				tr.appendChild(cell ? createLetterTd(cell) : createEmptyTd());
			}
			tbody.appendChild(tr);
		}
		return tbody;
	}

	function buildSoundsOrder(allNativeChars) {
		// Minimal, opinionated phonetic grouping (varn-like): vowels, then rows by articulation.
		const groups = [
			["ੳ", "ਅ", "ੲ","ਸ", "ਹ"],
			["ਕ", "ਖ", "ਗ", "ਘ", "ਙ"],
			["ਚ", "ਛ", "ਜ", "ਝ", "ਞ"],
			["ਟ", "ਠ", "ਡ", "ਢ", "ੜ", "ਣ"],
			["ਤ", "ਥ", "ਦ", "ਧ", "ਨ"],
			["ਪ", "ਫ", "ਬ", "ਭ", "ਮ"],
			["ਯ", "ਰ", "ਲ", "ਵ"],

		];

		const desired = [];
		const already = new Set();

		for (const group of groups) {
			for (const ch of group) {
				if (allNativeChars.includes(ch) && !already.has(ch)) {
					desired.push(ch);
					already.add(ch);
				}
			}
		}

		// Append anything we didn't classify, preserving original order.
		for (const ch of allNativeChars) {
			if (!already.has(ch)) desired.push(ch);
		}

		return desired;
	}

	document.addEventListener("DOMContentLoaded", () => {
		const baseTable = document.getElementById("baseLettersTable");
		if (!baseTable) return;

		const toggleBtn = document.getElementById("layoutToggle");
			const printBtn = document.getElementById("printBtn");
		const headingEl = document.getElementById("layoutHeading");
		if (!toggleBtn || !headingEl) return;
			if (printBtn) {
				printBtn.addEventListener("click", () => window.print());
			}

		const originalTbody = baseTable.tBodies[0];
		if (!originalTbody) return;

		// Capture the current layout as the "similar characters" grid (including empty placeholders).
		const similarGrid = [];
		const allLetters = [];
		for (const tr of Array.from(originalTbody.rows)) {
			for (const td of Array.from(tr.cells)) {
				const isEmpty = td.classList.contains("empty");
				if (isEmpty) {
					similarGrid.push(null);
					continue;
				}

				const data = getCellData(td);
				if (!data.native) {
					similarGrid.push(null);
					continue;
				}
				similarGrid.push(data);
				allLetters.push(data);
			}
		}

		const byNative = new Map(allLetters.map((d) => [d.native, d]));
		const allNativeChars = allLetters.map((d) => d.native);
		const soundsOrder = buildSoundsOrder(allNativeChars);

		const COLUMNS_SIMILAR = 4;
		const COLUMNS_SOUNDS = 5;

		function renderSimilar() {
			const newTbody = renderGridToTbody(similarGrid, COLUMNS_SIMILAR);
			baseTable.replaceChild(newTbody, baseTable.tBodies[0]);
			headingEl.textContent = "Grouped by similar characters:";
			toggleBtn.textContent = "Arrange by sounds";
			toggleBtn.setAttribute("aria-pressed", "false");
		}

		function renderSounds() {
			const soundsCells = [];
			for (const nativeChar of soundsOrder) {
				const data = byNative.get(nativeChar);
				if (data) soundsCells.push(data);
			}
			while (soundsCells.length % COLUMNS_SOUNDS !== 0) soundsCells.push(null);
			const newTbody = renderGridToTbody(soundsCells, COLUMNS_SOUNDS);
			baseTable.replaceChild(newTbody, baseTable.tBodies[0]);
			headingEl.textContent = "Arranged by sounds:";
			toggleBtn.textContent = "Arrange by similar characters";
			toggleBtn.setAttribute("aria-pressed", "true");
		}

		let mode = "similar";
		toggleBtn.addEventListener("click", () => {
			mode = mode === "similar" ? "sounds" : "similar";
			if (mode === "sounds") renderSounds();
			else renderSimilar();
		});

		// Ensure initial UI text is consistent even if HTML changes.
		renderSimilar();
	});
})();
