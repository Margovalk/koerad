document.addEventListener("DOMContentLoaded", () => {
    const breedSelect = document.getElementById("dog-breed");
    const colorSelect = document.getElementById("dog-color");
    const dogImages = document.querySelectorAll(".dog-image");
    const specialText = document.getElementById("special-text");
    const accordionHeader = document.querySelector(".accordion h3");
    const accordionContent = document.querySelector(".accordion .content");

    let moveRequestId = null; // Funktsioon liikumise haldamiseks

    // Funktsioon: Uuenda aktiivne tõug ja rakenda värv
    function updateDogPreview() {
        const selectedBreed = breedSelect.value;
        const selectedFilter = colorSelect.value;

        // Peida kõik pildid ja lähtesta algne positsioon
        dogImages.forEach((img) => {
            img.classList.remove("active");
            img.style.filter = ""; // Lähtesta filter
            img.style.top = "0"; // Lähtesta positsioon
            img.style.left = "50%"; // Lähtesta horisontaalne positsioon
            img.style.transform = "translateX(-50%)"; // Keskendamine
        });

        // Näita valitud tõugu ja rakenda filter
        const activeImage = document.getElementById(selectedBreed);
        if (activeImage) {
            activeImage.classList.add("active");

            // Rakenda värvifilter, kui valitud värv pole "none"
            if (selectedFilter !== "none") {
                activeImage.style.filter = selectedFilter;
            }
        }

        // Kuvame teksti, kui valitakse lilla
        if (selectedFilter === "sepia(1) saturate(3) hue-rotate(270deg)") {
            specialText.style.display = "block";
        } else {
            specialText.style.display = "none";
        }

        // Kui valitakse "Roheline", liigub koera pilt mööda ekraani
        if (selectedFilter === "sepia(1) saturate(3) hue-rotate(90deg)") {
            moveDogImage(activeImage);
        } else {
            // Kui värv ei ole roheline või lilla, pilt ei liigu ja jääb algsesse kohta
            stopDogMovement(activeImage);
        }
    }

    // Funktsioon, mis liigutab koera pilti mööda ekraani sujuvalt
    function moveDogImage(image) {
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;

        // Koera liikumispiirangud ekraanil
        const maxX = screenWidth - image.offsetWidth;
        const maxY = screenHeight - image.offsetHeight;

        let randomX, randomY;

        // Liikumine toimub sujuvalt
        function move() {
            randomX = Math.random() * maxX; // Liikumise kaugus vasakult
            randomY = Math.random() * maxY; // Liikumise kaugus üles
            image.style.left = `${randomX}px`;
            image.style.top = `${randomY}px`;

            // Kasutame requestAnimationFrame-i, et liikumine oleks sujuv
            moveRequestId = requestAnimationFrame(move);
        }

        // Stopime olemasoleva liikumise
        if (moveRequestId !== null) {
            cancelAnimationFrame(moveRequestId);
        }

        move(); // Algatame liikumise
    }

    // Funktsioon, mis peatab koera liikumise, kui ei ole roheline või lilla
    function stopDogMovement(image) {
        image.style.transition = "none"; // Eemalda liikumisanimatsioon
        if (moveRequestId !== null) {
            cancelAnimationFrame(moveRequestId); // Peatame liikumise
            moveRequestId = null; // Lähtesta liikumise juhtimis-ID
        }
    }

    // Accordion avamine ja sulgemine
    accordionHeader.addEventListener("click", () => {
        if (accordionContent.style.display === "block") {
            accordionContent.style.display = "none"; // Kui see on avatud, siis sulge see
        } else {
            accordionContent.style.display = "block"; // Kui see on suletud, siis ava see
        }
    });

    // Lisa sündmused valiku muutmiseks
    breedSelect.addEventListener("change", updateDogPreview);
    colorSelect.addEventListener("change", updateDogPreview);

    // Esialgne eelvaade
    updateDogPreview();
});
