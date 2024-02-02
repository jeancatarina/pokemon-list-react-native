const { exec } = require('child_process');
const { readdir } = require('fs/promises');
const { join } = require('path');

const DIR = '.';
const PREFIX = 'build-';

async function getLatestBuild() {
	try {
		const fileNames = await readdir(DIR);
		const buildFiles = fileNames.filter((fileName) => fileName.startsWith(PREFIX));
		buildFiles.sort((a, b) => {
			const timeA = parseInt(a.split('-')[1]);
			const timeB = parseInt(b.split('-')[1]);
			return timeB - timeA;
		});
		return buildFiles.length > 0 ? join(DIR, buildFiles[0]) : null;
	} catch (error) {
		console.error('Error reading directory:', error);
		return null;
	}
}

async function main() {
	const latestBuild = await getLatestBuild();

	if (latestBuild) {
		const submitCommand = `eas submit -p android --path ${latestBuild}`;

		const childProcess = exec(submitCommand, (error, stdout, stderr) => {
			if (error) {
				console.error('Error running eas submit:', error.message);
				return;
			}
			console.log('eas submit output:', stdout);
		});

		childProcess.stdout?.on('data', (data) => console.log('↩︎', data.toString()));
		childProcess.stderr?.on('data', (data) => console.error('stderr:', data.toString()));
	} else {
		console.log('No build files found.');
	}
}

main();