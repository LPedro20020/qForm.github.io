document.addEventListener('DOMContentLoaded', function() {
    const sections = [
        document.getElementById('helloDiv'),
        document.getElementById('okSection'),
        document.getElementById('yesNoSection'),
        document.getElementById('dateOptionsSection'),
        document.getElementById('thankYouSection')
    ];
    const helloButton = document.getElementById('helloButton');
    const yesNoCheckbox = document.getElementById('yesNoCheckbox');
    const yesButton = document.getElementById('yesButton');
    const submitFormButton = document.getElementById('submitFormButton');
    const forwardButton = document.getElementById('forwardButton');
    const backwardButton = document.getElementById('backwardButton');

    let currentSectionIndex = 0;

    function showSection(index) {
        sections.forEach((section, i) => {
            section.style.display = i === index ? 'block' : 'none';
        });
        if (index === 3) {
            document.getElementById('additionalInputs').style.display = 'block';
        } else {
            document.getElementById('additionalInputs').style.display = 'none';
        }
    }

    function nextSection() {
        if (currentSectionIndex < sections.length - 1) {
            currentSectionIndex++;
            showSection(currentSectionIndex);
        }
    }

    function previousSection() {
        if (currentSectionIndex > 0) {
            currentSectionIndex--;
            showSection(currentSectionIndex);
        }
    }

    // Show the helloDiv section by default
    showSection(currentSectionIndex);

    helloButton.addEventListener('click', function() {
        currentSectionIndex = 1;
        showSection(currentSectionIndex);
    });

    yesNoCheckbox.addEventListener('change', function() {
        if (this.checked) {
            currentSectionIndex = 2;
            showSection(currentSectionIndex);
        }
    });

    yesButton.addEventListener('click', function() {
        currentSectionIndex = 3;
        showSection(currentSectionIndex);
    });

    submitFormButton.addEventListener('click', function() {
        currentSectionIndex = 4;
        showSection(currentSectionIndex);
    });

    forwardButton.addEventListener('click', nextSection);
    backwardButton.addEventListener('click', previousSection);
});
