const caesar = require('./caesar');
const { Command } = require('commander');
const fs = require('fs');
var inputFile = '';
var outputFile = '';
var inputInfo = '';
var result = '';
const program = new Command();
try {
    program
        .storeOptionsAsProperties(true)
        .passCommandToAction(false);
    program
        .option('-s, --shift <type>', 'a shift')
        .option('-i, --input [type]', 'an input file')
        .option('-o, --output [type]', 'an output file')
        .option('-a,--action <type>', 'an action encode/decode');

    program.parse(process.argv);

    if (!program.action) throw 'Please enter the action (encode/decode)';
    if (!program.shift) {
        throw 'Please check the shift';
    } else if (program.shift <= 0) {
        throw 'Please check the shift';
    }
    if (program.input){
        if (!(typeof program.input === typeof true)){
            inputFile = program.input;
        }
        else{
            process.stdin.on('data', (data) => {
                inputInfo = data;
            })

        }
    }
    else{
        throw 'Please define input key';
    }
    if (program.output){
        if (!(typeof program.output === typeof true)){
            outputFile = program.output;
        }
    }
    else{
        throw 'Please define output key';
    }
    if (inputFile !== ''){
        if (!fs.existsSync(inputFile)){
            process.stderr.write('Input file is not found');
        }
        else{
            inputInfo = fs.readFileSync(inputFile, 'ascii');
        }
    }
    if (program.action === 'encode'){
        result = caesar.ceaserCipherEncode(inputInfo, Number.parseInt(program.shift));
    }else if (program.action === 'decode'){
        result = caesar.ceaserCipherDecode(inputInfo, Number.parseInt(program.shift));
    }
    else throw 'Incorrect action';

    if (outputFile !== ''){
        if (!fs.existsSync(outputFile)){
            process.stderr.write('Output file is not found');
        }
        else{
            fs.writeFileSync(outputFile, result);
        }
    }
    else{
        process.stdout.write(result);
    }
}

catch (e)
{
    console.log(e);
    process.exit(0);
}
