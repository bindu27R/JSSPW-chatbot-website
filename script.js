// Handle Login Validation
if (document.getElementById('loginForm')) {
    document.getElementById('loginForm').addEventListener('submit', function (event) {
      event.preventDefault();
  
      var username = document.getElementById('username').value;
      var password = document.getElementById('password').value;
      var errorMessage = document.getElementById('error-message');
  
      // Username and password validation
      var usernamePattern = /^[a-z0-9]+$/; // Lowercase letters and numbers only
      var passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/; // 6+ characters, at least one uppercase letter, one lowercase letter, and one number
  
      if (!usernamePattern.test(username)) {
        errorMessage.textContent = 'Username should be lowercase letters and numbers only.';
      } else if (!passwordPattern.test(password)) {
        errorMessage.textContent = 'Password should be at least 6 characters, with at least one uppercase letter, one lowercase letter, and one number.';
      } else {
        // Redirect to chatbot page if login is successful
        window.location.href = "chat.html";
      }
    });
  }
  
  // Handle Chatbot Response and History Management
document.addEventListener("DOMContentLoaded", function() {
    const historyBtn = document.getElementById("history-btn");
    const historyBox = document.getElementById("history-box");
    const historyContent = document.getElementById("history-content");
    const clearHistoryBtn = document.getElementById("clear-history");

    // Toggle History Panel
    historyBtn.addEventListener("click", function() {
        historyBox.style.display = historyBox.style.display === "block" ? "none" : "block";
    });

    // Clear History
    clearHistoryBtn.addEventListener("click", function() {
        historyContent.innerHTML = "";
    });

    // Store messages in history
    let chatHistory = [];

    // Handle chatbot response
    if (document.getElementById("chat-input")) {
        function getChatbotResponse() {
            const input = document.getElementById("chat-input").value.toLowerCase().trim();
            const responseBox = document.getElementById("chat-history");

            // Clear input field after submitting
            document.getElementById("chat-input").value = "";

            // FAQ responses with detailed answers
            const faqs = {
                "admissions": "Admissions are based on merit, requiring a 10th-grade pass (SSLC) or equivalent. The process starts in June, and required documents include your 10th mark sheet, transfer certificate, caste certificate (if applicable), and passport-size photos. Visit www.jsspwmys.org/admissions for more details.",
                "apply for admission":"Prospective students can apply for admission by visiting the official website and following the application procedures outlined. It's advisable to check the eligibility criteria and admission timelines to ensure a successful application. Visit www.jsspwmys.org/admissions for more details.", 
                "placement-opportunities":"Yes, JSSPW has a dedicated placement cell that assists students in securing job opportunities post-graduation. The institution maintains collaborations with various industries to facilitate campus recruitment drives. ",
                "scholarship opportunities":"JSSPW offers various scholarships and financial aid options to deserving students based on merit and need. Applicants are encouraged to inquire about scholarship programs during the admission process.",
                "courses": "We offer diploma programs in:\n- Computer Science & Engineering\n- Electronics & Communication Engineering\n- Electronic Instrumentation and Control Engineering. Each course provides hands-on training and industry-relevant skills. More details at www.jsspwmys.org/courses.",
                
                "fees": "The annual tuition fee varies between ₹10,000 and ₹30,000, depending on the course and category. Additional costs include hostel and examination fees. Scholarships are available for eligible students. Full details at www.jsspwmys.org/fees.",
                " extracurricular-activities":"The institution encourages students to participate in various extracurricular activities, including sports, cultural events, and technical clubs. These activities aim to promote holistic development and nurture talents beyond academics.",
                "location": "JSS Polytechnic for Women is located in Mysore within the Manasagangothri campus. The address is: JSS Polytechnic for Women, Mysore, Karnataka - 570006.",
                
                "contact": "📞 Phone: +91-821-2548273 \n📧 Email: jsspwmys@gmail.com. For department-wise contact details, visit www.jsspwmys.org/contact.",
                
                "hostel": "Hostel facilities include furnished rooms, mess, Wi-Fi, 24/7 security, and medical support. Fees depend on room type. Details at www.jsspwmys.org/hostel.",
                
                "faculty": "Our experienced faculty members ensure high-quality education with a balance of theory and practical learning. Faculty details at www.jsspwmys.org/faculty.",
                
                "exam-schedule": "Exams are held at the end of each semester. Timetables, syllabus, and previous year’s papers are available at www.jsspwmys.org/exams.",
                
                "placement": "Our placement cell connects students with top recruiters like Infosys, Wipro, TCS, and Bosch. Training sessions, mock interviews, and resume-building workshops are provided. Updates at www.jsspwmys.org/placements.",
                
                "events": "We host technical workshops, cultural fests, and sports competitions throughout the year. Find upcoming events at www.jsspwmys.org/events.",
                
                "library": "The library has a wide collection of books, research papers, and digital resources. Open from 9 AM - 7 PM on weekdays. Learn more at www.jsspwmys.org/library.",
                
                // General conversation responses
                "hi": "Hello! How can I assist you today?",
                "hey": "Hey there! How can I help you?",
                "good morning": "Good morning! Hope you have a great day ahead.",
                "good night": "Good night! Sleep well and take care.",
                "bye": "Goodbye! Have a wonderful day.",
                "hello": "Hello! How can I assist you today?",
                "how are you": "I'm just a bot, but I'm here to help! How are you?",
                "thank you": "You're welcome! Let me know if you need anything else.",
                };
              
        
            // Default response if no match is found
            let response = "Sorry, I don't understand your query. Please check the FAQs or visit our official website.";

            // Check if user input matches any FAQ key
            for (let key in faqs) {
                if (input.includes(key)) {
                    response = faqs[key];
                    break;
                }
            }

            // Create a paragraph for the user's message and append to chat history
            let userQuery = document.createElement("p");
            userQuery.innerHTML = `<strong class="user-query">You:</strong> ${input}`;
            responseBox.appendChild(userQuery);

            // Append chatbot response
            let botResponse = document.createElement("p");
            botResponse.innerHTML = `<strong class="chatbot-response">Chatbot:</strong> ${response}`;
            responseBox.appendChild(botResponse);

            // Store the chat history
            chatHistory.push({ userQuery: input, botResponse: response });

            // Update History Panel
            updateHistoryPanel();

            // Scroll to the bottom of the chat history
            responseBox.scrollTop = responseBox.scrollHeight;
        }

        // Update the history panel with previous queries and responses
        function updateHistoryPanel() {
            historyContent.innerHTML = "";
            chatHistory.forEach(function(item) {
                const historyItem = document.createElement("p");
                historyItem.innerHTML = `<strong class="user-query">You:</strong> ${item.userQuery}<br><strong class="chatbot-response">Chatbot:</strong> ${item.botResponse}`;
                historyContent.appendChild(historyItem);
            });
        }

        // Add event listener for form submission
        document.getElementById("chat-input-form").addEventListener("submit", function(event) {
            event.preventDefault();
            const input = document.getElementById("chat-input").value.trim();
            if (input === "") {
                alert("Please enter a message!");
                return;
            }
            getChatbotResponse();
        });
    }
});
