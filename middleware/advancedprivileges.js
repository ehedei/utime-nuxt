export default function (context) {
  const user = context.$auth.user

  if (user.role === 'user') {
    return context.redirect('/')
  }
}