document.getElementById('baseInput').addEventListener('input', function(e){
    if (document.getElementById('baseInput').value == 0){
       document.getElementById('output').style.visibility = 'hidden'; 
    } else {
        let x = document.getElementById('modeSelect');
        let unit = x.options[x.selectedIndex].value;
        if (unit == 1){
            let lbs = e.target.value;
            document.getElementById('output').style.visibility = 'visible';
            document.getElementById('lbsOutput').innerHTML = Math.round(lbs * 100) / 100;
            document.getElementById('gramsOutput').innerHTML = Math.round((lbs / 0.0022046) * 100) / 100;
            document.getElementById('kgOutput').innerHTML = Math.round((lbs / 2.2046) * 100) / 100;
            document.getElementById('ozOutput').innerHTML = Math.round((lbs * 16) * 100) / 100;
        } else if (unit == 2){
            let g = e.target.value;
            document.getElementById('output').style.visibility = 'visible';
            document.getElementById('lbsOutput').innerHTML = Math.round((g * 0.0022046) * 100) / 100;
            document.getElementById('gramsOutput').innerHTML = Math.round(g * 100) / 100;
            document.getElementById('kgOutput').innerHTML = Math.round((g / 1000) * 100) / 100;
            document.getElementById('ozOutput').innerHTML = Math.round((g * 0.035274) * 100) / 100;
        } else if (unit == 3){
            let kg = e.target.value;
            document.getElementById('output').style.visibility = 'visible';
            document.getElementById('lbsOutput').innerHTML = Math.round((kg * 2.2046) * 100) / 100;
            document.getElementById('gramsOutput').innerHTML = Math.round((kg * 1000) * 100) / 100;
            document.getElementById('kgOutput').innerHTML = Math.round(kg * 100) / 100;
            document.getElementById('ozOutput').innerHTML = Math.round((kg * 35.274) * 100) / 100;
        } else if (unit == 4){
            let oz = e.target.value;
            document.getElementById('output').style.visibility = 'visible';
            document.getElementById('lbsOutput').innerHTML = Math.round((oz * 0.0625) * 100) / 100;
            document.getElementById('gramsOutput').innerHTML = Math.round((oz / 0.035274) * 100) / 100;
            document.getElementById('kgOutput').innerHTML = Math.round((oz / 35.274) * 100) / 100;
            document.getElementById('ozOutput').innerHTML = Math.round(oz * 100) / 100;
        }
        document.getElementById('modeSelect').addEventListener('change', function(e){
            // document.getElementById('baseInput').value = null; // Resets value of input.
            // document.getElementById('output').style.visibility = 'hidden'; // Hides output.
            var element = document.getElementById('baseInput');
            var event = new Event('input');
            element.dispatchEvent(event);
        });
    }   
});