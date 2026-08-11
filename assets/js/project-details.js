document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // GET PROJECT ID FROM URL
    // ==========================================

    const urlParams = new URLSearchParams(window.location.search);

    const projectId = urlParams.get("id");


    // ==========================================
    // CHECK PROJECT ID
    // ==========================================

    if (!projectId) {

        console.error("No project ID found in URL.");

        return;

    }


    // ==========================================
    // LOAD PROJECT DATA
    // ==========================================

    fetch("assets/data/projects.json")

        .then(response => {

            if (!response.ok) {

                throw new Error("Unable to load projects.json");

            }

            return response.json();

        })


        .then(projects => {

            // Find the selected project

            const project = projects.find(
                item => item.id === projectId
            );


            // ==========================================
            // PROJECT NOT FOUND
            // ==========================================

            if (!project) {

                console.error("Project not found:", projectId);

                return;

            }


            // ==========================================
            // PAGE TITLE
            // ==========================================

            document.title =
                `${project.title} | Sumon Furniture & Interior`;


            // ==========================================
            // BANNER
            // ==========================================

            const bannerTitle =
                document.getElementById("project-banner-title");

            if (bannerTitle) {

                bannerTitle.innerHTML =
                    `${project.title}`;

            }


            const breadcrumbProject =
                document.getElementById("breadcrumb-project");

            if (breadcrumbProject) {

                breadcrumbProject.textContent =
                    project.title;

            }


            // ==========================================
            // PROJECT CATEGORY
            // ==========================================

            const projectCategory =
                document.getElementById("project-category");

            if (projectCategory) {

                projectCategory.textContent =
                    project.category;

            }


            // ==========================================
            // MAIN PROJECT IMAGE
            // ==========================================

            const mainImage =
                document.getElementById("project-main-image");

            if (mainImage) {

                mainImage.src =
                    project.image;

                mainImage.alt =
                    project.title;

            }


            // ==========================================
            // PROJECT INFORMATION
            // ==========================================

            const infoTitle =
                document.getElementById("project-info-title");

            if (infoTitle) {

                infoTitle.textContent =
                    project.title;

            }


            const infoCategory =
                document.getElementById("project-info-category");

            if (infoCategory) {

                infoCategory.textContent =
                    project.category;

            }


            const location =
                document.getElementById("project-location");

            if (location) {

                location.textContent =
                    project.location || "—";

            }


            const description =
                document.getElementById("project-description");

            if (description) {

                description.textContent =
                    project.description || "";

            }


           // ==========================================
// PROJECT GALLERY
// ==========================================

const gallery =
    document.getElementById("project-gallery");

const galleryPrev =
    document.getElementById("gallery-prev");

const galleryNext =
    document.getElementById("gallery-next");

const galleryCounter =
    document.getElementById("gallery-counter");


let currentGalleryIndex = 0;
let galleryImages = [];


if (gallery && project.gallery && project.gallery.length > 0) {

    galleryImages = project.gallery;

    gallery.innerHTML = "";


    project.gallery.forEach((image, index) => {

        const galleryItem =
            document.createElement("div");

        galleryItem.className =
            "project-gallery-item";


        galleryItem.innerHTML = `

            <img
                src="${image}"
                alt="${project.title} - Image ${index + 1}"
                loading="lazy"
            >

        `;


        gallery.appendChild(galleryItem);

    });


    // ==========================================
    // UPDATE GALLERY
    // ==========================================

    function updateGallery() {

        const itemWidth =
            document.querySelector(".project-gallery-item")
            ?.getBoundingClientRect().width || 0;

        const gap = 20;

        gallery.style.transform =
            `translateX(-${currentGalleryIndex * (itemWidth + gap)}px)`;


        if (galleryCounter) {

            galleryCounter.textContent =
                `${currentGalleryIndex + 1} / ${galleryImages.length}`;

        }

    }


    // ==========================================
    // NEXT
    // ==========================================

    galleryNext.addEventListener("click", () => {

        if (
            currentGalleryIndex <
            galleryImages.length - 1
        ) {

            currentGalleryIndex++;

            updateGallery();

        }

    });


    // ==========================================
    // PREVIOUS
    // ==========================================

    galleryPrev.addEventListener("click", () => {

        if (currentGalleryIndex > 0) {

            currentGalleryIndex--;

            updateGallery();

        }

    });


    // Initial position

    updateGallery();


    // Update position after resize

    window.addEventListener("resize", updateGallery);

}
            // ==========================================
            // YOUTUBE VIDEO
            // ==========================================

            const videoContainer =
                document.getElementById("project-video");


            if (videoContainer) {

                if (project.video) {

                    let videoId = "";


                    // YouTube watch URL

                    if (project.video.includes("watch?v=")) {

                        videoId =
                            project.video.split("watch?v=")[1]
                            .split("&")[0];

                    }


                    // YouTube short URL

                    else if (project.video.includes("youtu.be/")) {

                        videoId =
                            project.video.split("youtu.be/")[1]
                            .split("?")[0];

                    }


                    // YouTube embed URL

                    else if (project.video.includes("/embed/")) {

                        videoId =
                            project.video.split("/embed/")[1]
                            .split("?")[0];

                    }


                    if (videoId) {

                        videoContainer.innerHTML = `

                            <iframe
                                src="https://www.youtube.com/embed/${videoId}"
                                title="${project.title} - Project Video"
                                frameborder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowfullscreen>
                            </iframe>

                        `;

                    }

                }

                else {

                    videoContainer.innerHTML = `

                        <div class="no-project-video">

                            <i class="fa-brands fa-youtube"></i>

                            <h3>
                                Project Video Coming Soon
                            </h3>

                            <p>
                                We will add the project video here soon.
                            </p>

                        </div>

                    `;

                }

            }

        })


        // ==========================================
        // ERROR HANDLING
        // ==========================================

        .catch(error => {

            console.error(
                "Project Details Error:",
                error
            );

        });

});