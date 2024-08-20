<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Validation\Rule;

class UpdateInfoRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        // Extract user ID from JWT token
        $user = JWTAuth::parseToken()->authenticate();
        $userId = $user->id; // Get the currently authenticated user's ID
        return [
            'name' => ['sometimes', 'string', 'max:55'],
            'email' => [
                'sometimes',
                'email',
                'max:255',
                Rule::unique('users')->ignore($this->user()->id), // Exclude current user's email from unique check
            ],
            'password' => [
                'sometimes',
                'nullable',
                'string',
                'min:8',
                'max:20',
                'regex:/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/',
            ],
            'password_confirmation' => [
                'sometimes',
                'nullable',
                'string',
                'same:password', // Password confirmation must match the password
            ],
        ];
    }
}
