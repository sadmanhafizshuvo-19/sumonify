/* ==========================================
   CONTACT FORM - EMAILJS
========================================== */

document.addEventListener("DOMContentLoaded", function () {

    const contactForm = document.getElementById("contact-form");
    const formMessage = document.getElementById("form-message");

    if (!contactForm) {
        return;
    }


    /* ==========================================
       INITIALIZE EMAILJS
    ========================================== */

    emailjs.init({
        publicKey: "_3uyk0yfwXd34-miJ"
    });


    /* ==========================================
       FORM SUBMISSION
    ========================================== */

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();


        /* ==========================================
           GET FORM VALUES
        ========================================== */

        const name = document.getElementById("name").value;
        const phone = document.getElementById("phone").value;
        const email = document.getElementById("email").value;
        const location = document.getElementById("location").value;
        const service = document.getElementById("service").value;
        const projectDetails = document.getElementById("project_details").value;
        const budget = document.getElementById("budget").value;


        /* ==========================================
           CHECK REFERENCE IMAGE
        ========================================== */

        const imageInput = document.getElementById("furniture_image");

        let referenceImageStatus = "Not provided.";

        if (imageInput && imageInput.files.length > 0) {

            referenceImageStatus =
                "📎 Client provided a reference image.";

        }


        /* ==========================================
           SUBMIT BUTTON
        ========================================== */

        const submitButton = contactForm.querySelector(
            'button[type="submit"]'
        );


        formMessage.textContent = "";
        formMessage.className = "form-message";


        submitButton.disabled = true;

        submitButton.classList.add("loading");

        submitButton.innerHTML = `
    <span class="submit-text">
        Sending
        <span class="loading-dots">
            <span>.</span>
            <span>.</span>
            <span>.</span>
        </span>
    </span>

    <i class="fa-solid fa-arrow-right"></i>
`;


        /* ==========================================
           EMAILJS PARAMETERS
        ========================================== */

        const templateParams = {

            name: name,

            phone: phone,

            email: email,

            location: location,

            service: service,

            project_details: projectDetails,

            budget: budget,

            reference_image_status: referenceImageStatus

        };


        /* ==========================================
           SEND EMAIL
        ========================================== */

        emailjs.send(
            "sumonify_com",
            "template_qffui9c",
            templateParams
        )

            .then(function (response) {

                console.log(
                    "EmailJS Success:",
                    response.status,
                    response.text
                );


                /* Success message */

                formMessage.textContent =
                    "Your project request has been submitted successfully. We will contact you soon.";

                formMessage.classList.add("success");


                /* Reset form */

                contactForm.reset();


                /* Restore button */

                submitButton.disabled = false;

                submitButton.classList.remove("loading");

                submitButton.innerHTML = `
    <span class="submit-text">
        Submit Project Request
    </span>

    <i class="fa-solid fa-arrow-right"></i>
`;

            })


            .catch(function (error) {

                console.error(
                    "EmailJS Error:",
                    error
                );


                formMessage.textContent =
                    "Something went wrong. Please try again or contact us directly.";

                formMessage.classList.add("error");


                submitButton.disabled = false;

                submitButton.classList.remove("loading");

                submitButton.innerHTML = `
    <span class="submit-text">
        Submit Project Request
    </span>

    <i class="fa-solid fa-arrow-right"></i>
`;

            });

    });

});
/* ==========================================
   DYNAMIC FURNITURE DETAILS
========================================== */

const serviceSelect = document.getElementById("service");
const detailsLabel = document.getElementById("details-label");
const projectDetails = document.getElementById("project_details");
const furnitureImageGroup = document.getElementById("furniture-image-group");


if (
    serviceSelect &&
    detailsLabel &&
    projectDetails &&
    furnitureImageGroup
) {

    serviceSelect.addEventListener("change", function () {

        if (this.value === "Custom Furniture") {

            /* Change label */

            detailsLabel.innerHTML = `
                Furniture Details
                <span>*</span>
            `;


            /* Change placeholder */

            projectDetails.placeholder =
                "Tell us what furniture you need. Mention the furniture type, size/dimensions, material, color, quantity and preferred design. If you have selected a product from our website, mention the Product ID. If you have a preferred design, you can upload its image below.";


            /* Show image upload */

            furnitureImageGroup.classList.add("show");

        }

        else {

            /* Restore normal project details */

            detailsLabel.innerHTML = `
                Project Details
                <span>*</span>
            `;


            projectDetails.placeholder =
                "Tell us about your project, requirements, preferred design or anything else you would like us to know.";


            /* Hide image upload */

            furnitureImageGroup.classList.remove("show");

        }

    });

}