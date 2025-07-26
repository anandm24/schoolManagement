import Admin from './models/adminModel.js'
import bcrypt from 'bcryptjs'

// ✅ Export it here
export const ensureDefaultAdmin = async () => {
  try {
    const existingAdmin = await Admin.findOne({ username: 'admin' })
    if (existingAdmin) {
      console.log('ℹ️ Default admin already exists')
      return
    }

    const hashedPassword = await bcrypt.hash('admin123', 10)
    const defaultAdmin = new Admin({
      name: 'Admin User',
      username: 'admin',
      password: hashedPassword,
      email: 'admin@example.com', // ✅ required field
      image: 'https://via.placeholder.com/150' // ✅ required field
    })

    await defaultAdmin.save()
    console.log('✅ Default admin created')
  } catch (error) {
    console.error('❌ Error creating default admin:', error.message)
  }
}
