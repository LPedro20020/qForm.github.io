document.addEventListener('DOMContentLoaded', function() {
    const helloDiv = document.getElementById('helloDiv');
    const okSection = document.getElementById('okSection');
    const yesNoSection = document.getElementById('yesNoSection');
    const dateOptionsSection = document.getElementById('dateOptionsSection');
    const thankYouSection = document.getElementById('thankYouSection');
    const helloButton = document.getElementById('helloButton');
    const yesNoCheckbox = document.getElementById('yesNoCheckbox');
    const yesButton = document.getElementById('yesButton');
    const submitFormButton = document.getElementById('submitFormButton');

    // Show the helloDiv section by default
    helloDiv.style.display = 'block';
    okSection.style.display = 'none';
    yesNoSection.style.display = 'none';
    dateOptionsSection.style.display = 'none';
    thankYouSection.style.display = 'none';

    helloButton.addEventListener('click', function() {
        helloDiv.style.display = 'none';
        okSection.style.display = 'block';
    });

    yesNoCheckbox.addEventListener('change', function() {
        if (this.checked) {
            okSection.style.display = 'none';
            yesNoSection.style.display = 'block';
        }
    });

    yesButton.addEventListener('click', function() {
        yesNoSection.style.display = 'none';
        dateOptionsSection.style.display = 'block';
    });

    submitFormButton.addEventListener('click', function() {
        dateOptionsSection.style.display = 'none';
        thankYouSection.style.display = 'block';
    });
});
