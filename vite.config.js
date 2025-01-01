const isCodeSandbox = 'SANDBOX_URL' in process.env || 'CODESANDBOX_HOST' in process.env;

export default {
    // Set root to 'src' since that's where your index.html is located
    root: 'src',  // index.html is inside 'src' folder

    // Make sure the public directory is correct, assuming you want to use 'public'
    publicDir: '../public',  // Reference public folder outside of 'src'

    // Set base path for all assets
    base: './',  // This ensures relative paths are used for assets

    server: {
        host: 'localhost',  // Explicitly set to localhost for local development
        open: !isCodeSandbox, // Open in browser if it's not a CodeSandbox environment
    },

    build: {
        // Set the output directory to 'dist' in the root of the project
        outDir: '../dist', // Outputs to 'dist' folder at the root of the project

        // Empty the output directory before building
        emptyOutDir: true,

        // Enable sourcemaps for easier debugging
        sourcemap: true,
    },
};