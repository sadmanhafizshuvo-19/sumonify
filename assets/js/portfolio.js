document.addEventListener("DOMContentLoaded", () => {

    const portfolioGrid = document.getElementById("portfolio-grid");

    if (!portfolioGrid) {
        return;
    }


    // ==========================================
    // GET CATEGORY FROM URL
    // ==========================================

    const urlParams = new URLSearchParams(window.location.search);

    const selectedCategory = urlParams.get("category");


    // ==========================================
    // LOAD PROJECTS FROM JSON
    // ==========================================

    fetch("assets/data/projects.json")

        .then(response => {

            if (!response.ok) {
                throw new Error("Unable to load projects.json");
            }

            return response.json();

        })

        .then(projects => {

            let filteredProjects = projects;


            // ==========================================
            // FILTER BY CATEGORY
            // ==========================================

            if (selectedCategory) {

                filteredProjects = projects.filter(project =>

                    project.category.toLowerCase() ===
                    selectedCategory.toLowerCase()

                );

            }


            // ==========================================
            // SHOW PROJECTS
            // ==========================================

            if (filteredProjects.length === 0) {

                portfolioGrid.innerHTML = `

                    <div class="portfolio-empty">

                        <h3>
                            More Projects Coming Soon
                        </h3>

                        <p>
                            We are currently updating this category
                            with more of our completed work.
                        </p>

                    </div>

                `;

                return;

            }


            filteredProjects.forEach(project => {

                const projectCard = document.createElement("a");

                projectCard.href =
                    `project-details.html?id=${encodeURIComponent(project.id)}`;

                projectCard.className = "category-card portfolio-card";


                projectCard.innerHTML = `

                    <div class="category-image">

                        <img
                            src="${project.image}"
                            alt="${project.title}"
                            loading="lazy"
                        >

                    </div>


                    <div class="category-content">

                        <span class="portfolio-card-category">

                            ${project.category}

                        </span>

                        <h3>

                            ${project.title}

                        </h3>

                        <span>

                            View Project

                            <i class="fa-solid fa-arrow-right"></i>

                        </span>

                    </div>

                `;


                portfolioGrid.appendChild(projectCard);

            });

        })


        // ==========================================
        // ERROR HANDLING
        // ==========================================

        .catch(error => {

            console.error("Portfolio Error:", error);

            portfolioGrid.innerHTML = `

                <div class="portfolio-empty">

                    <h3>
                        Unable to Load Projects
                    </h3>

                    <p>
                        Please try again later.
                    </p>

                </div>

            `;

        });

});