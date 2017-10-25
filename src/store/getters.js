/*
 * @Author: lidongliang
 * @Date: 2017-10-18 15:33:02
 * @Last Modified by:   lidongliang
 * @Last Modified time: 2017-10-18 15:33:02
 * getter
 */
const getters = {
  name: state => state.user.name,
  roles: state => state.user.roles,
  token: state => state.user.token,
  quota: state => state.user.quota
}
export default getters
