import exress from "express"
import { router } from "./router"

const app = exress()
app.use(exress.json())
router(app)
app.listen(4003)