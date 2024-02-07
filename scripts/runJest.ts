const os = require("os")
const { execSync } = require("child_process")

// Get the number of available CPU cores
const cpuCores = os.cpus().length

// Run Jest with the --maxWorkers option set to the number of CPU cores
try {
	execSync(`jest --ci --maxWorkers=${cpuCores}`, { stdio: "inherit" })
} catch (error) {
	console.error("Jest execution failed:", error)
	process.exit(1)
}
