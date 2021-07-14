export default function (context) {
  const user = context.$auth.user

  if (user.role !== 'admin') {
    return context.redirect('/')
  }
}