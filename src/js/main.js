// import { ggg } from './something';
// import myButton from './button';
import {Image, ImageTwo} from './img';
import { multiply } from './mathStuff';
import style from '../style/gStyle.css';
const $ = require('jquery');
import sass from '../sass/style.sass';

if(module.hot){
    module.hot.accept();
}

const appLink = document.getElementById('app');

const newMes = () => {
    return `
        <div id="${style.menu}" class="${style.box}">
            <button id="loadPage1">Page 1-01</button>
            <button id="loadPage2">Page 2-02</button>
        </div>
        <div id="content" class="${sass.content}">
            <h1>Home</h1>
        </div>
        <div id="content" class="${sass.content}">
            <h1>mutiply: 3x3 = ${multiply(3,3)}</h1>
        </div>
        <div id="content" class="${sass.content}">
            <div class="${sass.imgCont}">${Image}</div>
            <div class="${sass.imgCont}">${ImageTwo}</div>
        </div>
        `
}

appLink.innerHTML = newMes();
// myButton.el();

document.getElementById('loadPage1').addEventListener('click', function(){
    console.log('123');
    System.import('./page1.js').then(pageModule => {
        document.getElementById('content').innerHTML = pageModule.default;
    });
});

document.getElementById('loadPage2').addEventListener('click', function(){
    console.log('321');
    System.import('./page2.js').then(pageModule => {
        document.getElementById('content').innerHTML = pageModule.default;
    });
});

$('#app').css('backgroundColor', 'yellow');