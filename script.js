document.getElementById('yesNoCheckbox').addEventListener('change', function() {
    var additionalInputs = document.getElementById('additionalInputs');
    if (this.checked) {
        additionalInputs.style.display = 'block';
    } else {
        additionalInputs.style.display = 'none';
    }
});
