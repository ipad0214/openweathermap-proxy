"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const main_1 = require("./main");
const PORT = 5001;
main_1.default.listen(PORT, () => {
    console.log('Express server listening on port ' + PORT);
});
//# sourceMappingURL=server.js.map