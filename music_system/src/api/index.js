import request from './request'

//*******************标签接口************************
// 标签请求接口
export function apiGetTag(data){
    return request('POST','/tag', data)
}

// 修改标签请求接口
export function apiUpdateTag(data){
    return request('POST','/tag/update', data)
}

// 删除标签请求接口
export function apiRemoveTag(data){
    return request('POST','/tag/remove', data)
}

// 创建标签请求接口
export function apiCreateTag(data){
    return request('POST','/tag/create', data)
}

//*******************用户接口************************
// 注册接口
export function apiRegister(data){
    return request('POST','/user/register', data)
}

// 登录接口
export function apiLogin(data){
    return request('POST','/user/login', data)
}

// 上传用户头像接口
export function apiUploadUserImg(data){
    return request('POST','/user/upload', data)
}

// 获取全部用户信息接口
export function apiGetAllUser(data){
    return request('POST','/user/', data)
}

// 根据用户名获取用户信息接口
export function apiGetUserByUsername(data){
    return request('POST','/user/getByUsername', data)
}

// 修改用户信息接口
export function apiUpdateUser(data){
    return request('POST','/user/update', data)
}

// 删除用户信息接口
export function apiRemoveUser(data){
    return request('POST','/user/remove', data)
}

// 根据用户id获取收藏音乐列表接口
export function apiGetMusicIdByUserId(data){
    return request('POST','/user/getMusicIdById', data)
}

// 收藏歌曲
export function apiCollectionMusic(data){
    return request('POST','/user/collection', data)
}

//获取收藏歌单
export function apiGetCollection(data){
    return request('POST','/user/getCollection', data)
}

//取消收藏
export function apiRemoveCollection(data){
    return request('POST','/user/removeCollection', data)
}

//*******************轮播图接口************************
// 添加轮播图接口
export function apiCreateSwiper(data){
    return request('POST','/swiper/create', data)
}

// 上传轮播图接口
export function apiUploadSwiper(data){
    return request('POST','/swiper/upload', data)
}

// 获取全部轮播图接口
export function apiGetAllSwiper(data){
    return request('POST','/swiper/', data)
}

// 修改轮播图接口
export function apiUpdateSwiper(data){
    return request('POST','/swiper/update', data)
}

// 删除轮播图接口
export function apiRemoveSwiper(data){
    return request('POST','/swiper/remove', data)
}

//*******************推荐歌单接口************************
// 获取推荐歌单接口
export function apiGetAllRecommended(data){
    return request('POST','/recommended/', data)
}

// 修改推荐歌单接口
export function apiUpdateRecommended(data){
    return request('POST','/recommended/update', data)
}

//*******************资讯接口************************
// 添加资讯接口
export function apiCreateNews(data){
    return request('POST','/news/create', data)
}

// 获取全部资讯接口
export function apiGetAllNews(data){
    return request('POST','/news/', data)
}

// 根据标题获取资讯接口
export function apiGetNewsByTitle(data){
    return request('POST','/news/getByTitle', data)
}

// 修改资讯接口
export function apiUpdateNews(data){
    return request('POST','/news/update', data)
}

// 删除资讯接口
export function apiRemoveNews(data){
    return request('POST','/news/remove', data)
}

// 根据id获取资讯接口
export function apiGetNewsById(data){
    return request('POST','/news/getById', data)
}

//*******************音乐接口************************
// 添加歌曲接口
export function apiCreateMusic(data){
    return request('POST','/music/create', data)
}

// 上传封面接口
export function apiUploadMusicImg(data){
    return request('POST','/music/uploadImg', data)
}

//上传音乐接口
export function apiUploadMusicPath(data){
    return request('POST','/music/uploadMusic', data)
}

//获取全部音乐接口
export function apiGetAllMusic(data){
    return request('POST','/music/', data)
}

//根据歌名获取音乐接口
export function apiGetMusicByName(data){
    return request('POST','/music/getByName', data)
}

//根据id获取音乐接口
export function apiGetMusicById(data){
    return request('POST','/music/getById', data)
}

//修改音乐接口
export function apiUpdateMusic(data){
    return request('POST','/music/update', data)
}

//删除音乐接口
export function apiRemoveMusic(data){
    return request('POST','/music/remove', data)
}

//获取音乐数据总数接口
export function apiGetMusicCount(data){
    return request('POST','/music/count', data)
}

//获取新歌列表接口
export function apiGetNewMusic(data){
    return request('POST','/music/new', data)
}

//获取新歌列表接口
export function apiGetMusicByTag(data){
    return request('POST','/music/tag', data)
}

//获取热门歌曲列表接口
export function apiGetHotMusic(data){
    return request('POST','/music/hot', data)
}

//*******************评论接口************************
//获取全部评论
export function apiGetMessage(data){
    return request('POST','/message/', data)
}

//删除评论
export function apiRemoveMessage(data){
    return request('POST','/message/remove', data)
}

//添加评论
export function apiCreateMessage(data){
    return request('POST','/message/create', data)
}