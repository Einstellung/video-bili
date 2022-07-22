import parse from 'yargs-parser'
import chalk from 'chalk'
import Project from './Project'
import ProjectPackager from './ProjectPackager'
import ProjectDevServer from './ProjectDevServer'

const argv = parse(process.argv)
const cmd = argv._[2]

if(!cmd) {
  console.log(chalk.red("Command is needed."))
  process.exit(-1)
}

async function run() {
  switch(cmd) {
    case "create":
      await Project.create()
      console.log('create done')
      break
    case "dev":
      const packager = new ProjectPackager()
      packager.watch()
      const devServer = new ProjectDevServer(argv.port || 3000)
      devServer.start()
      break
  }
  console.log(chalk.green("Finished."))
}

run()