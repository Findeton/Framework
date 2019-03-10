"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compileSQLFilter = (filter) => {
    let queries = [];
    if (filter.$or) {
        let subqueries = filter.$or.map(exports.compileSQLFilter);
        let orQuery = exports.concatQueryStringsWithConjunction(subqueries, "OR");
        queries.push(orQuery);
    }
    if (filter.$and) {
        let subqueries = filter.$and.map(exports.compileSQLFilter);
        let andQuery = exports.concatQueryStringsWithConjunction(subqueries, "AND");
        queries.push(andQuery);
    }
    for (let field in filter) {
        if (field === "$or" || field === "$and") {
            continue;
        }
        if (!filter.hasOwnProperty(field)) {
            continue;
        }
        let subquery = filter[field];
        if (subquery === null) {
            queries.push(["?? IS NULL", [field]]);
        }
        else if (subquery.$in !== undefined) {
            if (subquery.$in.length === 0) {
                queries.push(["TRUE = FALSE", []]);
            }
            else {
                queries.push([
                    `?? IN (${subquery.$in.map((p) => "?").join(", ")})`,
                    [field, ...subquery.$in],
                ]);
            }
        }
        else if (subquery.$nin !== undefined) {
            if (subquery.$nin.length === 0) {
                queries.push(["TRUE = TRUE", []]);
            }
            else {
                queries.push([
                    `?? NOT IN (${subquery.$nin
                        .map((p) => "?")
                        .join(", ")})`,
                    [field, ...subquery.$nin],
                ]);
            }
        }
        else if (subquery.$neq !== undefined) {
            if (subquery.$neq === null) {
                queries.push(["?? IS NOT NULL", [field]]);
            }
            else {
                queries.push(["?? != ?", [field, subquery.$neq]]);
            }
        }
        else if (subquery.$gt !== undefined) {
            queries.push(["?? > ?", [field, subquery.$gt]]);
        }
        else if (subquery.$gte !== undefined) {
            queries.push(["?? >= ?", [field, subquery.$gte]]);
        }
        else if (subquery.$lt !== undefined) {
            queries.push(["?? < ?", [field, subquery.$lt]]);
        }
        else if (subquery.$lte !== undefined) {
            queries.push(["?? <= ?", [field, subquery.$lte]]);
        }
        else {
            queries.push(["?? = ?", [field, subquery]]);
        }
    }
    return exports.concatQueryStringsWithConjunction(queries, "AND");
};
exports.concatQueryStringsWithConjunction = (queries, conjunction) => {
    if (queries.length === 1) {
        return [queries[0][0], queries[0][1]];
    }
    return queries.reduce((memo, [subqueryString, subqueryArguments], idx) => {
        if (idx !== 0) {
            memo[0] += ` ${conjunction} `;
        }
        memo[0] += "(";
        memo[0] += subqueryString;
        memo[0] += ")";
        memo[1].push(...subqueryArguments);
        return memo;
    }, ["", []]);
};
//# sourceMappingURL=SQLFilterCompiler.js.map