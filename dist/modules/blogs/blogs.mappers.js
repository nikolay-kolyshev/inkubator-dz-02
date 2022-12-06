"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapBlogsSchemesToBlogsPaginationView = void 0;
var mapBlogsSchemesToBlogsPaginationView = function (_a) {
    var blogs = _a.blogs, page = _a.page, pageSize = _a.pageSize, totalCount = _a.totalCount, pagesCount = _a.pagesCount;
    return {
        pagesCount: pagesCount,
        page: page,
        pageSize: pageSize,
        totalCount: totalCount,
        items: blogs.map(function (blog) { return ({
            id: blog.id,
            name: blog.name,
            description: blog.description,
            websiteUrl: blog.websiteUrl,
            createdAt: blog.createdAt,
        }); }),
    };
};
exports.mapBlogsSchemesToBlogsPaginationView = mapBlogsSchemesToBlogsPaginationView;
//# sourceMappingURL=blogs.mappers.js.map