'use strict'

let tabLeft = document.querySelector('.tab-block__tab-item--left'),
	tabRight = document.querySelector('.tab-block__tab-item--right'),
	tabClassActive = 'tab-block__tab-item--active',
	inputs = document.querySelectorAll('input[type="number"]'),
	blockCount = document.querySelector('#blockCount'),
	pagesCount = document.querySelector('#pagesCount'),
	hoursPerProject = document.querySelector('#hoursPerProject'),
	hourCost = document.querySelector('#hourCost'),
	editCheckbox = document.querySelector('#editCheck'),
	cmsCheckbox = document.querySelector('#cmsCheck'),
	totalCost = document.querySelector('.total-cost__cost'),
	total = 0;

const landingPageCost = 1500,
		multiPageCost = 10000;

window.addEventListener('DOMContentLoaded', () => {

	totalCost.innerText = total;
	

	tabLeft.addEventListener('click', () => {

		tabRight.classList.remove(tabClassActive);
		tabLeft.classList.add(tabClassActive);

		for (let i = 0; i < inputs.length; i++) {
			inputs[i].value = '';
		}

		pagesCount.style.display = 'none';
		blockCount.style.display = 'flex';

		if (editCheckbox.checked) {
			editCheckbox.checked = false;
		}

		if (cmsCheckbox.checked) {
			cmsCheckbox.checked = false;
		}

		totalCost.innerText = landingPageCost;
	});

	tabRight.addEventListener('click', () => {

		tabLeft.classList.remove(tabClassActive);
		tabRight.classList.add(tabClassActive);

		for (let i = 0; i < inputs.length; i++) {
			inputs[i].value = '';
		}

		pagesCount.style.display = 'flex';
		blockCount.style.display = 'none';

		if (editCheckbox.checked) {
			editCheckbox.checked = false;
		}

		if (cmsCheckbox.checked) {
			cmsCheckbox.checked = false;
		}

		totalCost.innerText = multiPageCost;
	});

});