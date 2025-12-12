# Brae Cottage - Demo Website

A beautiful, aesthetic demo website for Brae Cottage B&B in Winster, Peak District National Park.

## 🏡 About

This is a frontend demo website built with plain HTML, CSS, and JavaScript for Brae Cottage, a small and highly-rated B&B known for:
- Welcoming hosts
- Exceptional breakfasts
- Homely accommodation
- Beautiful gardens
- A true getaway experience (no internet/mobile signal)

## 🚀 Features

- **Responsive Design**: Mobile-first approach, works on all devices
- **Smooth Animations**: Scroll-based animations and transitions
- **Booking Enquiry Form**: Interactive form with validation
- **Photo Gallery**: Placeholder gallery ready for real images
- **SEO Optimized**: Proper meta tags and semantic HTML
- **Contact Information**: Email, phone, and address prominently displayed
- **Guest Reviews Section**: Showcasing TripAdvisor reviews
- **Location Details**: Complete address and nearby attractions

## 📁 File Structure

```
Brae Cottage/
├── index.html          # Main HTML file
├── styles.css          # All styling
├── script.js           # Interactive functionality
└── README.md          # This file
```

## 🎨 Color Palette

- **Primary Green**: #2c5f4f (Peak District natural theme)
- **Accent Gold**: #d4a574 (Warm, welcoming)
- **Light Background**: #f8f9fa
- **Text Dark**: #2d3436
- **Text Light**: #636e72

## 🖥️ How to Use

1. Open `index.html` in any modern web browser
2. Navigate through sections using the menu
3. Fill out the booking enquiry form
4. All form submissions are logged to console (demo only)

## 📱 Sections

1. **Hero**: Eye-catching welcome section with call-to-action
2. **About**: Introduction to Brae Cottage with key features
3. **Accommodation**: Room details and amenities
4. **Gallery**: Photo gallery (placeholder gradients)
5. **Location**: Address, directions, and nearby attractions
6. **Reviews**: Guest testimonials
7. **Contact**: Contact information and booking form

## 🔧 Customization

### To Add Real Images:
Replace the gradient backgrounds in the gallery with actual images:
```css
.gallery-item {
    background-image: url('path/to/image.jpg');
}
```

### To Connect Form to Backend:
Modify the form submission handler in `script.js` to send data to your API:
```javascript
fetch('your-api-endpoint', {
    method: 'POST',
    body: JSON.stringify(formData)
})
```

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 📞 Contact Information

**Brae Cottage**
- Email: stay@braecottageskye.co.uk
- Phone: 01470 521245 / 07932 329603
- Address: East Bank, Winster, Peak District, DE4 2DT, England

## 🎯 Future Enhancements (via Cogniq)

- AI Chatbot for instant guest queries
- Real-time availability calendar
- Online booking system
- Payment integration
- Automated email confirmations
- Analytics dashboard
- Blog/Local guide section
- Multi-language support

## 📝 License

Demo website built for Brae Cottage.
Powered by **Cogniq**.

---

**Note**: This is a demo/prototype website. Images are placeholder gradients. Replace with actual photographs for production use.
