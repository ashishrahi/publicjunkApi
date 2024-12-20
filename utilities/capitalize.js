function capitalizeFirstLetters(inputString) {
    return inputString
        .split(' ') // Split the string into an array of words
        .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize first letter and append the rest of the word
        .join(' '); // Join the words back into a string
}

// Example usage
const text = "make every first letter capital";
const result = capitalizeFirstLetters(text);
console.log(result); // Output: "Make Every First Letter Capital"
