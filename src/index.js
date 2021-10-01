import './sass/main.scss';
import fetchCountries from './js/fetchCountries';
import countryTemplate from './templates/countryTemplate.hbs';
import allCountriesTemplate from './templates/allCountriesTemplate.hbs';

import debounce from 'lodash.debounce';

import { alert, error, defaultModules } from '@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '@pnotify/mobile/dist/PNotifyMobile.js';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
defaultModules.set(PNotifyMobile, {});

const refs = {
  searchQuery: document.querySelector('#input'),
  allCountries: document.querySelector('.js-articles'),
  wrapper: document.querySelector('.wrapper'),
};

refs.searchQuery.addEventListener('input', debounce(onSearch, 500));

function onSearch(e) {
  refs.allCountries.innerHTML = '';
  const userRequest = e.target.value.trim();
  if (userRequest.length < 1) return;
  fetchCountries(userRequest)
    .then(country => {
      if (!country) return;
      if (country.length > 1 && country.length <= 10) {
        return (refs.allCountries.innerHTML = allCountriesTemplate(country));
      }
      if (country.length === 1) {
        return (refs.wrapper.innerHTML = countryTemplate(...country));
      }
      error({ text: 'Too many matches found. Please enter a more specific query!' });
    })
    .catch(error => {
      alert('Nothing found');
    });
}
