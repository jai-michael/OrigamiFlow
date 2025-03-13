# Origami Flow

## Overview
Origami Flow is a emotionally-driven journaling app dedicated to helping children build the proper emotional management skills. We believe that emotions shape our experiences, and understanding them is the key to personal growth. Our platform is designed to help children and young adults navigate their emotions through structured journaling and guided reflection.

## Accessibility
Our design consists of a calming yet contrasting color palette that ensures readability for all and across devices. The use of neural colors provides a gentle yet effective contrast that supports users with visual impairments and color blindness. It also ensures the design does not unintentionally influence emotions. We also include other graphical elements such as origami icons alongside text to create more indicators for users based on any potential disabilities. We have included a speech-to-text feature for journaling to assist users with impairments. Our pages have been tested with screen reading programs and keyboard navigation to ensure usability for all.

## Installation
1. Clone this repository: jai-michael/OrigamiFlow
2. Start a local server at index.html

### Usability Notes
This website currently relies on the SessionStorage API for page navigation. We have added code to automatically clear the website's session storage on page load at the landing page (index.html). If the site is refreshed or changes pages without the use of the website's buttons, the session storage may get out of order and alter the loading order of the prompts. If this issue occurs, manually clear the session storage and start the website from index.html.

