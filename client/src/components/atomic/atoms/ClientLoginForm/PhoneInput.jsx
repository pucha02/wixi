import './ClientLoginForm.css'

export const LoginFormPhoneInputAtom = ({ handleChange, userData }) => {
    return (
        <input
            className='login-input'
            type="text"
            name="number_phone"
            placeholder="Номер телефона"
            value={userData.number_phone}
            onChange={handleChange}
        />
    )
}