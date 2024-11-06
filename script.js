document.addEventListener('DOMContentLoaded', function() {
    const sections = [
        document.getElementById('helloDivSection'),
        document.getElementById('okSection'),
        document.getElementById('yesNoSection'),
        document.getElementById('dateOptionsSection'),
        document.getElementById('thankYouSection')
    ];

    async function saveCheckboxState() {
        const checkboxes = document.querySelectorAll('#additionalInputs input[type="checkbox"]');
        const checkboxState = {};
        checkboxes.forEach(checkbox => {
            checkboxState[checkbox.id] = checkbox.checked;
        });
        const data = await fetch('data.json').then(response => response.json());
        data.checkboxState = checkboxState;
        await fetch('data.json', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    }

    async function loadCheckboxState() {
        const data = await fetch('data.json').then(response => response.json());
        const checkboxState = data.checkboxState || {};
        const checkboxes = document.querySelectorAll('#additionalInputs input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            if (checkboxState[checkbox.id] !== undefined) {
                checkbox.checked = checkboxState[checkbox.id];
            }
        });
    }

    loadCheckboxState();
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

    let meGifIndex = 0;
    let herGifIndex = 0;
    const meGifs = [
        document.getElementById('meGif1'),
        document.getElementById('meGif2'),
        document.getElementById('meGif3'),
        document.getElementById('meGif4'),
        document.getElementById('meGif5'),
        document.getElementById('meGif6')
    ];
    const herGifs = [
        document.getElementById('herGif1'),
        document.getElementById('herGif2'),
        document.getElementById('herGif3'),
        document.getElementById('herGif4'),
        document.getElementById('herGif5'),
        document.getElementById('herGif6')
    ];
    const finalNoGif = document.getElementById('finalNoGif');
    const yesNoButtons = document.getElementById('yesNoButtons');

    function showGifs(meIndex, herIndex) {
        meGifs.forEach((gif, i) => {
            gif.style.display = i === meIndex ? 'block' : 'none';
        });
        herGifs.forEach((gif, i) => {
            gif.style.display = i === herIndex ? 'block' : 'none';
        });
    }

    yesNoCheckbox.addEventListener('change', function() {
        if (this.checked) {
            currentSectionIndex = 2;
            showSection(currentSectionIndex);
            showGifs(meGifIndex, herGifIndex);
            finalNoGif.style.display = 'none';
            yesNoButtons.style.display = 'block';
        }
    });

    yesButton.addEventListener('click', function() {
        currentSectionIndex = 3;
        showSection(currentSectionIndex);
    });

    const reconsiderButton = document.getElementById('reconsiderButton');

    let scaleFactor = 1;
    let transparentFactor = 1;

    noButton.addEventListener('click', function() {
        if (meGifIndex < meGifs.length - 1) {
            meGifIndex = (meGifIndex + 1) % meGifs.length;
            herGifIndex = (herGifIndex + 1) % herGifs.length;
            showGifs(meGifIndex, herGifIndex);
        } else {
            finalNoGif.style.display = 'block';
            yesNoButtons.style.display = 'none';
            meGifs.forEach(gif => gif.style.display = 'none');
            herGifs.forEach(gif => gif.style.display = 'none');
            reconsiderButton.style.display = 'block';
        }

        scaleFactor *= 2;
        transparentFactor *= 1.5
        yesButton.style.transform = `scale(${scaleFactor})`;
        yesButton.style.opacity = 1 / transparentFactor;
    });

    reconsiderButton.addEventListener('click', function() {
        finalNoGif.style.display = 'none';
        reconsiderButton.style.display = 'none';
        yesNoButtons.style.display = 'block';
        meGifIndex = 0;
        herGifIndex = 0;
        showGifs(meGifIndex, herGifIndex);
        scaleFactor = 1;
        yesButton.style.transform = 'scale(1)';
        yesButton.style.opacity = 1;
    });

    const dateIdeaInput = document.getElementById('dateIdeaInput');
    const dateIdeaDescriptionInput = document.getElementById('dateIdeaDescriptionInput');
    const dateIdeasList = document.getElementById('dateIdeasList');

    async function saveDateIdeas() {
        const rows = dateIdeasList.querySelectorAll('tbody tr');
        const dateIdeas = [];
        rows.forEach(row => {
            const cells = row.querySelectorAll('td');
            dateIdeas.push({
                idea: cells[0].textContent,
                description: cells[1].textContent
            });
        });
        const data = await fetch('data.json').then(response => response.json());
        data.dateIdeas = dateIdeas;
        await fetch('data.json', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    }

    async function loadDateIdeas() {
        const data = await fetch('data.json').then(response => response.json());
        const dateIdeas = data.dateIdeas || [];
        dateIdeas.forEach(idea => {
            const row = document.createElement('tr');
            const dateIdeaCell = document.createElement('td');
            const dateIdeaDescriptionCell = document.createElement('td');
            dateIdeaCell.textContent = idea.idea;
            dateIdeaDescriptionCell.textContent = idea.description;
            row.appendChild(dateIdeaCell);
            row.appendChild(dateIdeaDescriptionCell);
            dateIdeasList.querySelector('tbody').appendChild(row);
        });
    }

    enterIdeaButton.addEventListener('click', async function() {
        const dateIdea = dateIdeaInput.value.trim();
        const dateIdeaDescription = dateIdeaDescriptionInput.value.trim();
        if (dateIdea) {
            const row = document.createElement('tr');
            const numberCell = document.createElement('td');
            const dateIdeaCell = document.createElement('td');
            const dateIdeaDescriptionCell = document.createElement('td');
            const actionCell = document.createElement('td');
            numberCell.textContent = dateIdeasList.querySelectorAll('tbody tr').length + 1;
            dateIdeaCell.textContent = dateIdea;
            dateIdeaDescriptionCell.textContent = dateIdeaDescription;
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Trash';
            deleteButton.style.opacity = '0.5';
            deleteButton.addEventListener('mouseover', function() {
                deleteButton.style.opacity = '1';
            });
            deleteButton.addEventListener('mouseout', function() {
                deleteButton.style.opacity = '0.5';
            });
            deleteButton.addEventListener('click', async function() {
                row.remove();
                await saveDateIdeas();
            });
            row.appendChild(numberCell);
            row.appendChild(dateIdeaCell);
            row.appendChild(dateIdeaDescriptionCell);
            row.appendChild(deleteButton);
            dateIdeasList.querySelector('tbody').appendChild(row);
            dateIdeaInput.value = ''; // Clear the input field
            dateIdeaDescriptionInput.value = ''; // Clear the description input field
            await saveDateIdeas();
        }
    });

    loadDateIdeas();

    submitFormButton.addEventListener('click', function() {
        currentSectionIndex = 4;
        showSection(currentSectionIndex);
        saveDateIdeas();
    });

    forwardButton.addEventListener('click', function() {
        nextSection();
        saveCheckboxState();
    });
    backwardButton.addEventListener('click', function() {
        previousSection();
        saveCheckboxState();
    });
});
