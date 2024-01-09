import { sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import {
  Error,
  Form,
  Input,
  Switcher,
  Title,
  Wrapper,
} from "../components/AuthComponents";
import GithubButton from "../components/GithubButton";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  // Refactor using react-hook-form
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | undefined>("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === "email") {
      setEmail(value);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // x refresh
    e.preventDefault();
    // reset error
    setError("");
    if (isLoading || email === "") return;
    try {
      setLoading(true);
      // send password reset email
      await sendPasswordResetEmail(auth, email);
      alert("Check your email to reset your password");
      // refirect to login page
      navigate("/login");
    } catch (err) {
      if (err instanceof FirebaseError) {
        setError(err.message);
      }
      // setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      <Title>Reset Password</Title>
      <Form onSubmit={onSubmit}>
        <Input
          onChange={onChange}
          name="email"
          value={email}
          placeholder="Email"
          type="email"
          required
        />
        <Input
          type="submit"
          value={isLoading ? "Loading..." : "Create Account"}
        />
        {error !== "" ? <Error>{error}</Error> : null}
        <Switcher>
          New to 𝕏?
          <Link to={"/create-account"}> Log in &rarr;</Link>
        </Switcher>
        <Switcher isSecond>
          Already a member of 𝕏?
          <Link to={"/login"}> Log in &rarr;</Link>
        </Switcher>
        <GithubButton />
      </Form>
    </Wrapper>
  );
}
