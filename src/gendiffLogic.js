const gendiff = (program) => {
    const version = '1.0.0';
    program
        .version(version)
        .description('Compares two configuration files and shows a difference.');
    
    program.helpInformation = () => {
        return `Usage: gendiff [options]

Compares two configuration files and shows a difference.

Options:
    -V, --version        output the version number
    -h, --help           output usage information
`};
};

export default gendiff;
